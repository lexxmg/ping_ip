
import classes from './uiUpButton.module.css';
import React, { useState, useEffect, useCallback } from 'react';

const UpButton = ({children, className, ...props}) => {
  const [isScroll, currentScroll] = useBtnActive();
  const [pathLength, scrollUpSvgPath] = usePathLengthSVG();

  const height = document.documentElement.scrollHeight - window.innerHeight;

  return (
    <div className={isScroll ? `${classes.scrollUp} ${classes.scrollUpActive}` : classes.scrollUp} {...props}>
      <svg className={classes.scrollUpSvg} viewBox="-2 -2 52 52">
        <path
          className={classes.scrollUpSvgPath}
          style={{
            strokeDashoffset: pathLength - (currentScroll * pathLength / height) || 0,
            strokeDasharray: `${pathLength} ${pathLength}` || 0
          }}
          ref={scrollUpSvgPath}
          d="
            M24,0
            a24,24 0 0,1 0,48
            a24,24 0 0,1 0,-48
          "
        />
      </svg>
    </div>
  )

  function useBtnActive() {
    const [on, setOn] = useState(false);
    const [scroll, setScroll] = useState(0);

    const isScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;

      if (currentScroll > 1000) {
        setOn(true);
      } else {
        setOn(false);
      }

      setScroll(currentScroll);
    }

    useEffect(() => {
      window.addEventListener('scroll', isScroll);

      return () => {
        window.removeEventListener('scroll', isScroll);
      }
    });

    return [on, scroll];
  }

  function usePathLengthSVG() {
    const [pathLength, setPathLength] = useState(0);

    const ref = useCallback((node) => {
      if (node !== null) {
        setPathLength( node.getTotalLength() );

        node.style.transition = 'stroke-dashoffset 20ms';
      }
    }, []);

    return [pathLength, ref];
  }
}

export default UpButton;
