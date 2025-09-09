import { useState, useEffect, useRef, useCallback } from 'react';
import useQueryStore from '../store/queryStore';

const useWebcamController = (camType) => {
  const [webcamStream, setWebcamStream] = useState(null);
  const [webcamError, setWebcamError] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [webcamStatus, setWebcamStatus] = useState('stopped'); // 'connected', 'disconnected', 'stopped', 'paused', 'error'
  const [isCapturing, setIsCapturing] = useState(false);
  const [lastInferenceResult, setLastInferenceResult] = useState(null);
  const [inferenceError, setInferenceError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const captureIntervalRef = useRef(null);
  
  // API 엔드포인트 설정
  const VLM_ENDPOINT = 'http://localhost:8000';
  
  // Zustand store에서 선택된 쿼리 정보 가져오기
  const { selectedQuery } = useQueryStore();

  // 이미지를 Blob으로 변환하는 함수
  const captureImageAsBlob = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) {
      console.error('비디오 또는 캔버스 요소가 없습니다.');
      return null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 캔버스 크기를 비디오 크기에 맞춤
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 비디오 프레임을 캔버스에 그리기
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 캔버스를 Blob으로 변환
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.8);
    });
  }, []);

  // 백엔드 API로 이미지 전송하는 함수
  const sendImageToAPI = useCallback(async (imageBlob) => {
    if (!imageBlob) {
      console.error('이미지 Blob이 없습니다.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', imageBlob, 'webcam-capture.jpg');
      
      // 선택된 쿼리 정보 추가
      if (selectedQuery?.value) {
        formData.append('query', selectedQuery.value);
      }
      if (selectedQuery?.label) {
        formData.append('query_label', selectedQuery.label);
      }

      console.log('API 요청 데이터:', {
        image: 'Blob 데이터',
        query: selectedQuery?.value || '없음',
        query_label: selectedQuery?.label || '없음'
      });

      const response = await fetch(`${VLM_ENDPOINT}/api/vlm/inference`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API 응답:', result);
      
      // 백엔드 응답 형식에 맞게 파싱
      const parsedResult = {
        success: result.success,
        eventDetected: result.event_detected,
        similarityScore: result.similarity_score,
        queryLabel: result.query_label,
        queryText: result.query_text,
        message: result.message,
        threshold: result.threshold
      };
      
      console.log('파싱된 결과:', parsedResult);
      setLastInferenceResult(parsedResult);
      setInferenceError(null);
      return parsedResult;
    } catch (error) {
      console.error('API 통신 오류:', error);
      setInferenceError(error.message);
      return null;
    }
  }, [VLM_ENDPOINT, selectedQuery]);

  // 이미지 캡처 및 API 전송 함수
  const captureAndSendImage = useCallback(async () => {
    if (!isWebcamActive || webcamStatus !== 'connected') {
      return;
    }

    try {
      const imageBlob = await captureImageAsBlob();
      if (imageBlob) {
        await sendImageToAPI(imageBlob);
      }
    } catch (error) {
      console.error('이미지 캡처 및 전송 오류:', error);
      setInferenceError(error.message);
    }
  }, [isWebcamActive, webcamStatus, captureImageAsBlob, sendImageToAPI]);

  // 캡처 시작 함수 (2 FPS = 500ms 간격)
  const startCapturing = useCallback(() => {
    if (isCapturing) return;
    
    setIsCapturing(true);
    setInferenceError(null);
    
    // 즉시 한 번 실행
    captureAndSendImage();
    
    // 500ms 간격으로 반복 실행 (2 FPS)
    captureIntervalRef.current = setInterval(captureAndSendImage, 500);
    
    console.log('이미지 캡처 시작 (2 FPS)');
  }, [isCapturing, captureAndSendImage]);

  // 캡처 중지 함수
  const stopCapturing = useCallback(() => {
    if (!isCapturing) return;
    
    setIsCapturing(false);
    
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
    
    console.log('이미지 캡처 중지');
  }, [isCapturing]);

  // 캡처 상태 토글 함수
  const toggleCapturing = useCallback(() => {
    if (isCapturing) {
      stopCapturing();
    } else {
      startCapturing();
    }
  }, [isCapturing, startCapturing, stopCapturing]);

  // 웹캠 연결 함수
  const connectWebcam = async () => {
    try {
      setWebcamStatus('disconnected');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }, 
        audio: false 
      });
      
      console.log('웹캠 스트림 획득:', stream);
      setWebcamStream(stream);
      setIsWebcamActive(true);
      setWebcamError(null);
      setWebcamStatus('connected');
      
      // 비디오 요소에 스트림 연결
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        console.log('비디오 요소에 스트림 연결됨');
        
        // 비디오 로드 이벤트 추가
        videoRef.current.onloadedmetadata = () => {
          console.log('비디오 메타데이터 로드됨');
          videoRef.current.play().catch(e => console.error('비디오 재생 실패:', e));
        };
        
        videoRef.current.oncanplay = () => {
          console.log('비디오 재생 준비됨');
        };
        
        videoRef.current.onerror = (e) => {
          console.error('비디오 에러:', e);
          setWebcamError('비디오 스트림을 재생할 수 없습니다.');
          setWebcamStatus('error');
        };
      }
    } catch (error) {
      console.error('웹캠 연결 실패:', error);
      setWebcamError('웹캠에 접근할 수 없습니다. 브라우저 권한을 확인해주세요.');
      setIsWebcamActive(false);
      setWebcamStatus('error');
    }
  };

  // 웹캠 일시정지 함수
  const pauseWebcam = () => {
    if (webcamStream && webcamStatus === 'connected') {
      console.log('웹캠 일시정지 시작');
      webcamStream.getTracks().forEach(track => track.enabled = false);
      setIsWebcamActive(false);
      setWebcamStatus('paused');
      
      // 비디오 요소가 있으면 일시정지
      if (videoRef.current) {
        videoRef.current.pause();
        console.log('비디오 요소 일시정지됨');
      }
    }
  };

  // 웹캠 재개 함수
  const resumeWebcam = () => {
    if (webcamStream && webcamStatus === 'paused') {
      webcamStream.getTracks().forEach(track => track.enabled = true);
      setIsWebcamActive(true);
      setWebcamStatus('connected');
      
      // 비디오 요소가 있으면 강제로 재생 시도
      if (videoRef.current) {
        console.log('웹캠 재개: 비디오 재생 시도');
        videoRef.current.play().catch(e => {
          console.error('비디오 재생 실패:', e);
          // 재생 실패 시 다시 시도
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play().catch(e2 => console.error('비디오 재생 재시도 실패:', e2));
            }
          }, 100);
        });
      }
    }
  };

  // 웹캠 연결 해제 함수
  const disconnectWebcam = () => {
    // 캡처 중지
    stopCapturing();
    
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
      setIsWebcamActive(false);
      setWebcamStatus('stopped');
    }
  };

  // 웹캠 상태 토글 함수
  const toggleWebcamStatus = () => {
    if (webcamStatus === 'connected') {
      pauseWebcam();
    } else if (webcamStatus === 'paused') {
      resumeWebcam();
    } else if (webcamStatus === 'stopped' && camType === 'webcam') {
      connectWebcam();
    } else if (webcamStatus === 'error' && camType === 'webcam') {
      connectWebcam();
    }
  };

  // 컴포넌트 마운트 시 웹캠 연결
  useEffect(() => {
    if (camType === 'webcam') {
      connectWebcam();
    }

    // 컴포넌트 언마운트 시 웹캠 연결 해제 및 캡처 중지
    return () => {
      stopCapturing();
      disconnectWebcam();
    };
  }, [camType, stopCapturing]);

  // 웹캠 스트림 상태 모니터링
  useEffect(() => {
    if (webcamStream) {
      const checkStreamHealth = () => {
        const tracks = webcamStream.getTracks();
        const hasActiveTrack = tracks.some(track => track.readyState === 'live');
        const hasEnabledTrack = tracks.some(track => track.enabled);
        
        console.log('스트림 상태 체크:', {
          hasActiveTrack,
          hasEnabledTrack,
          currentStatus: webcamStatus,
          videoPaused: videoRef.current?.paused
        });
        
        if (!hasActiveTrack && webcamStatus === 'connected') {
          console.log('스트림 비활성화 감지: Error 상태로 변경');
          setWebcamStatus('error');
          setIsWebcamActive(false);
        } else if (!hasEnabledTrack && webcamStatus === 'connected') {
          console.log('트랙 비활성화 감지: Paused 상태로 변경');
          setWebcamStatus('paused');
          setIsWebcamActive(false);
        } else if (hasEnabledTrack && webcamStatus === 'paused') {
          console.log('트랙 활성화 감지: Connected 상태로 변경');
          setWebcamStatus('connected');
          setIsWebcamActive(true);
        }
      };

      const interval = setInterval(checkStreamHealth, 2000);
      return () => clearInterval(interval);
    }
  }, [webcamStream, webcamStatus]);

  return {
    webcamStream,
    webcamError,
    isWebcamActive,
    webcamStatus,
    videoRef,
    canvasRef,
    isCapturing,
    lastInferenceResult,
    inferenceError,
    connectWebcam,
    pauseWebcam,
    resumeWebcam,
    disconnectWebcam,
    toggleWebcamStatus,
    startCapturing,
    stopCapturing,
    toggleCapturing,
    captureAndSendImage
  };
};

export default useWebcamController;
