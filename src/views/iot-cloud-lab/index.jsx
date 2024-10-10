import { useState, useEffect } from 'react';
import { useSprings, animated } from 'react-spring';
import './index.less';

const IoTCloudLabWelcome = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const lines = [
    { text: "🤖YUN-JU-IOT-CLUB🤖", size: "large" },
    { text: "🙉欢迎来到云聚社区物联网云端实验室", size: "large" },
    { text: "🐿️本平台借助阿里云物联网平台设计了物联网云端实验场景", size: "small" },
    { text: "🦄这里会提供教程并将扮演服务端的角色，接收和消费物联网设备的消息，让您体验并掌握物联网云开发的流程", size: "small" }
  ];

  const springs = useSprings(
    lines.length,
    lines.map((_, index) => ({
      opacity: index < visibleLines ? 1 : 0,
      transform: index < visibleLines ? 'translateY(0)' : 'translateY(-20px)',
      config: { tension: 300, friction: 20 }
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => Math.min(prev + 1, lines.length));
    }, 1000);
    return () => clearInterval(timer);
  }, [lines.length]);

  useEffect(() => {
    const handleScrollDown = (event) => {
      if (event.deltaY > 0 && visibleLines === lines.length) {
        window.location.href = '/ioTCloudLab';
      }
    };

    window.addEventListener('wheel', handleScrollDown);
    return () => {
      window.removeEventListener('wheel', handleScrollDown);
    };
  }, [visibleLines, lines.length]);

  return (
    <div id="root">
      <div id="overlay"></div>
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {springs.map((style, index) => (
          <animated.div key={index} style={style}>
            <h1 className={lines[index].size === "large" ? "large-text" : "small-text"}>
              {lines[index].text}
            </h1>
          </animated.div>
        ))}
        {visibleLines === lines.length && (
          <div className="scroll-down" style={{ marginTop: '20px' }}>
            <span>⬇️ 下滑前往</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IoTCloudLabWelcome;
