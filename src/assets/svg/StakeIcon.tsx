// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const StakeIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" viewBox="0 0 18 18" {...props}>
    <Path
      d="M12.75 0c-1.345 0-2.563.252-3.516.727C8.282 1.202 7.5 1.975 7.5 3v3c0 .097.032.19.047.281A9.135 9.135 0 0 0 5.25 6c-1.345 0-2.563.252-3.516.727C.782 7.2 0 7.975 0 9v6c0 1.025.782 1.799 1.735 2.273.952.475 2.17.727 3.515.727 1.345 0 2.564-.252 3.516-.727C9.717 16.8 10.5 16.025 10.5 15v-.305c.734.199 1.49.301 2.25.305 1.345 0 2.563-.252 3.516-.727C17.217 13.8 18 13.025 18 12V3c0-1.025-.782-1.798-1.735-2.273C15.315.252 14.095 0 12.75 0Zm0 1.5c1.142 0 2.16.246 2.836.586.677.34.914.697.914.914 0 .217-.237.575-.914.914-.676.34-1.694.586-2.836.586s-2.16-.246-2.836-.586C9.237 3.574 9 3.217 9 3c0-.217.237-.575.914-.914.676-.34 1.694-.586 2.836-.586ZM9 5.133c.079.043.152.1.235.14.952.475 2.17.727 3.515.727 1.345 0 2.563-.252 3.516-.727.082-.04.155-.096.234-.14V6c0 .218-.237.574-.914.914-.677.34-1.694.586-2.836.586s-2.16-.246-2.836-.586C9.237 6.574 9 6.217 9 6v-.867ZM5.25 7.5c1.142 0 2.16.246 2.836.586.677.34.914.697.914.914 0 .217-.237.575-.914.914-.677.34-1.694.586-2.836.586s-2.16-.246-2.836-.586C1.737 9.574 1.5 9.217 1.5 9c0-.217.237-.575.914-.914.676-.34 1.694-.586 2.836-.586Zm11.25.633V9c0 .217-.237.575-.914.914-.677.34-1.694.586-2.836.586a7.127 7.127 0 0 1-2.25-.352V9c0-.097-.032-.19-.047-.281.697.181 1.47.281 2.297.281 1.345 0 2.563-.252 3.516-.727.082-.04.155-.096.234-.14Zm-15 3c.079.044.152.1.235.14.952.475 2.17.727 3.515.727 1.345 0 2.564-.252 3.516-.727.082-.04.155-.096.234-.14V12c0 .217-.237.575-.914.914-.677.34-1.694.586-2.836.586s-2.16-.246-2.836-.586c-.677-.34-.914-.697-.914-.914v-.867Zm15 0V12c0 .217-.237.575-.914.914-.677.34-1.694.586-2.836.586-.853 0-1.623-.12-2.25-.329V11.72a8.8 8.8 0 0 0 2.25.281c1.345 0 2.563-.252 3.516-.727.082-.04.155-.096.234-.14Zm-15 3c.079.044.152.1.235.14.952.475 2.17.727 3.515.727 1.345 0 2.564-.252 3.516-.727.082-.04.155-.096.234-.14V15c0 .217-.237.575-.914.914-.677.34-1.694.586-2.836.586s-2.16-.246-2.836-.586c-.677-.34-.914-.697-.914-.914v-.867Z"
      fill={props.color}
    />
  </Svg>
);
