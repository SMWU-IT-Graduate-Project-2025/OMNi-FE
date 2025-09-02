import { useState, useEffect, useRef } from 'react';

const useWebcamController = (camType) => {
  const [webcamStream, setWebcamStream] = useState(null);
  const [webcamError, setWebcamError] = useState(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [webcamStatus, setWebcamStatus] = useState('stopped'); // 'connected', 'disconnected', 'stopped', 'paused', 'error'
  const videoRef = useRef(null);

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

    // 컴포넌트 언마운트 시 웹캠 연결 해제
    return () => {
      disconnectWebcam();
    };
  }, [camType]);

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
    connectWebcam,
    pauseWebcam,
    resumeWebcam,
    disconnectWebcam,
    toggleWebcamStatus
  };
};

export default useWebcamController;
