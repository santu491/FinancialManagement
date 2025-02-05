import React from 'react';

import Svg, {Path} from 'react-native-svg';
import {COLOR} from '../../src/theme';

export const RightArrow = ({color = '#231E33', width = 12, height = 12}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 12" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 10.517L3.983 12l6-6-6-6L2.5 1.483 7.017 6 2.5 10.517z"
        fill={color}
      />
    </Svg>
  );
};

export const PencilIcon = ({size = 16, color = COLOR.BLUE}) => (
  <Svg width={size} height={size} viewBox="0 0 30 30">
    <Path
      d="M24.91 0c1.292 0 2.583.501 3.586 1.504a5.027 5.027 0 010 7.172L8.985 28.188l-7.173 1.426L0 30l.386-1.812 1.35-6.787.076-.386L21.324 1.504A5.055 5.055 0 0124.91 0zM3.972 22.79l-.81 4.048 4.049-.81a5.84 5.84 0 00-3.24-3.239zM20.476 5.86L5.553 20.784a8.408 8.408 0 013.663 3.663L24.14 9.524l-3.663-3.663zm4.434-3.509c-.622 0-1.248.285-1.85.887l-.849.887 3.663 3.663.887-.848c1.2-1.2 1.2-2.502 0-3.702-.602-.602-1.229-.887-1.85-.887z"
      fill={color}
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    />
  </Svg>
);

export const PencilIconFilled = ({size = 18, color = COLOR.BLUE}) => (
  <Svg width={size} height={size} viewBox="0 0 19 20" fill="none">
    <Path
      d="M5.924 18.106l9.293-9.293L10.803 4.4 1.51 13.692a1.003 1.003 0 00-.263.464L.217 19.4l5.242-1.03c.176-.044.337-.135.465-.263zM18.217 5.813a2 2 0 000-2.828L16.63 1.4a2 2 0 00-2.828 0l-1.586 1.586L16.63 7.4l1.586-1.586z"
      fill={color}
    />
  </Svg>
);
