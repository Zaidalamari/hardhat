import * as React from "react"
import { SVGProps, memo } from "react"

const HardhatLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={151}
    height={33}
    viewBox="0 0 151 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M68.4207 25.1449V18.0117H60.4066V25.1449H57.5977V8.95251H60.4066V15.7588H68.4207V8.95251H71.2557V25.1449H68.4207Z"
      fill="#0A0A0A"
    />
    <path
      d="M85.2315 25.1479L84.6695 23.2001C84.0555 24.2127 82.2425 25.3312 79.5365 25.3312C76.7265 25.3312 74.4795 24.0908 74.4795 21.3574C74.4795 18.9797 76.1905 17.8899 79.9185 17.5372L84.0315 17.132C83.9545 15.2496 83.2645 14.1598 80.6315 14.1598C78.2045 14.1598 77.5415 15.1218 77.5415 16.7406L74.8805 16.7674C74.8805 14.0845 76.0045 12.0119 80.6015 12.0119C85.9385 12.0119 86.7075 14.2906 86.7075 17.7799V25.143L85.2315 25.1479ZM84.0315 19.1768L80.3315 19.582C78.0595 19.8366 77.2925 20.3161 77.2925 21.3287C77.2925 22.5175 78.3145 23.2011 80.2295 23.2011C82.6295 23.2011 84.0355 21.8349 84.0355 19.583L84.0315 19.1768Z"
      fill="#0A0A0A"
    />
    <path
      d="M95.8037 14.3668C93.0717 14.3668 92.5297 15.8668 92.5297 17.9592V25.1449H89.8027V12.1902H91.2587L91.9037 13.9864C92.3127 13.1274 93.5627 12.0139 96.1167 12.0139H96.5517V14.4183C96.2877 14.4183 96.0337 14.3668 95.8037 14.3668Z"
      fill="#0A0A0A"
    />
    <path
      d="M108.932 25.1459L108.318 23.2982C107.858 24.1839 106.403 25.3242 103.308 25.3242C98.9919 25.3242 97.7139 22.2114 97.7139 18.6685C97.7139 15.1257 98.9398 12.0148 103.281 12.0148C105.861 12.0148 107.164 12.9253 107.726 13.7863V7.25739H110.408V25.1459H108.932ZM104.104 14.2885C101.117 14.2885 100.504 16.06 100.504 18.6656C100.504 21.2712 101.118 23.0941 104.08 23.0941C107.119 23.0941 107.757 21.3227 107.757 18.6656C107.757 16.164 107.222 14.2915 104.105 14.2915L104.104 14.2885Z"
      fill="#0A0A0A"
    />
    <path
      d="M123.107 25.1459V17.8839C123.107 15.4546 122.698 14.2915 119.913 14.2915C117.156 14.2915 116.567 15.4299 116.567 17.8839L116.517 25.1459H113.836V7.25739H116.518V13.8061C117.028 12.8758 118.177 12.0099 120.681 12.0099C124.946 12.0099 125.814 14.4144 125.814 18.1335V25.1409L123.107 25.1459Z"
      fill="#0A0A0A"
    />
    <path
      d="M139.249 25.1479L138.687 23.2001C138.073 24.2127 136.26 25.3312 133.549 25.3312C130.739 25.3312 128.492 24.0908 128.492 21.3574C128.492 18.9797 130.203 17.8899 133.932 17.5372L138.043 17.132C137.971 15.2496 137.282 14.1598 134.643 14.1598C132.218 14.1598 131.553 15.1218 131.553 16.7406L128.892 16.7674C128.892 14.0845 130.016 12.0119 134.613 12.0119C139.95 12.0119 140.719 14.2906 140.719 17.7799V25.143L139.249 25.1479ZM138.049 19.1768L134.349 19.582C132.077 19.8366 131.31 20.3161 131.31 21.3287C131.31 22.5175 132.332 23.2011 134.247 23.2011C136.647 23.2011 138.053 21.8349 138.053 19.583L138.049 19.1768Z"
      fill="#0A0A0A"
    />
    <path
      d="M146.989 14.3668V21.4257C146.989 22.6404 147.499 23.1971 150.335 23.0713V25.243C146.019 25.4956 144.206 24.4831 144.206 21.4208V14.3668H142.339V12.748L144.204 12.1912V8.95251H146.911V12.1912H150.333V14.3629L146.989 14.3668Z"
      fill="#0A0A0A"
    />
    <path
      d="M45.72 29.1316V26.9123C45.72 26.5002 45.026 26.1069 43.78 25.7522L43.81 22.9901C43.8101 18.7351 42.4899 14.5829 40.0285 11.0961C37.567 7.60926 34.0832 4.95629 30.049 3.4966L29.96 2.94278C29.9141 2.64674 29.7844 2.36966 29.586 2.14364C29.3876 1.91763 29.1286 1.75193 28.839 1.66574C24.9713 0.540782 20.8588 0.540782 16.991 1.66574C16.7007 1.75106 16.4408 1.91626 16.2414 2.14215C16.0421 2.36803 15.9116 2.64532 15.865 2.94179L15.78 3.45796C11.7213 4.9039 8.21195 7.55571 5.73116 11.0513C3.25038 14.5469 1.91907 18.7159 1.91904 22.9891V25.7631C0.690039 26.1168 0.00603913 26.5061 0.00603913 26.9153V29.1345C-0.013545 29.2645 0.0148605 29.3971 0.0860391 29.508C0.697423 29.0558 1.39951 28.7386 2.14504 28.5778C4.04492 28.1192 5.97605 27.7987 7.92304 27.6187C8.46891 27.5572 9.02175 27.6118 9.54461 27.7789C10.0675 27.946 10.5483 28.2217 10.955 28.5877C12.4593 29.9512 14.4242 30.7076 16.463 30.7078H29.263C31.3021 30.7079 33.2673 29.9511 34.771 28.5867C35.1769 28.219 35.6574 27.9414 36.1802 27.7724C36.7031 27.6034 37.2564 27.547 37.803 27.6068C39.7496 27.7856 41.6804 28.1048 43.58 28.5619C44.2866 28.6958 44.9537 28.9853 45.532 29.409C45.565 29.4417 45.604 29.4694 45.632 29.5001C45.7042 29.3913 45.7353 29.2608 45.72 29.1316Z"
      fill="#FFF100"
    />
    <path
      d="M10.9849 24.4613C10.9689 23.9521 10.9579 23.4418 10.9579 22.9277C10.9639 15.2129 12.7829 8.29367 15.7809 3.46191C11.7227 4.90746 8.21355 7.5586 5.73263 11.0534C3.25171 14.5483 1.91988 18.7165 1.91895 22.9891V25.7631C4.89521 25.0596 7.92954 24.6239 10.9849 24.4613Z"
      fill="url(#paint0_linear_4440_14095)"
    />
    <path
      d="M43.8083 22.9891C43.8152 18.173 42.1245 13.5056 39.0283 9.79266C40.3706 14.0418 41.0392 18.4715 41.0103 22.9237C41.0103 23.6757 40.9903 24.4187 40.9553 25.1558C41.9051 25.302 42.8458 25.5005 43.7733 25.7502L43.8083 22.9891Z"
      fill="url(#paint1_linear_4440_14095)"
    />
    <path
      d="M43.5798 28.5698C41.6799 28.1113 39.7488 27.7907 37.8018 27.6108C37.2556 27.5501 36.7026 27.6056 36.1797 27.7736C35.6569 27.9415 35.1762 28.218 34.7698 28.5847C33.2659 29.9487 31.3008 30.7051 29.2618 30.7048H16.4668C14.4287 30.7044 12.4646 29.9485 10.9608 28.5857C10.5552 28.2175 10.0748 27.9394 9.55192 27.77C9.02901 27.6007 8.47561 27.544 7.9288 27.6038C5.98184 27.7835 4.05071 28.1037 2.1508 28.5619C1.40595 28.7247 0.704275 29.0418 0.0917969 29.4922C1.0628 30.9654 10.8918 32.5119 22.8678 32.5119C34.8438 32.5119 44.6678 30.9604 45.6418 29.4932C45.6078 29.4634 45.5698 29.4347 45.5418 29.403C44.9562 28.9881 44.2869 28.7039 43.5798 28.5698Z"
      fill="url(#paint2_radial_4440_14095)"
    />
    <path
      d="M22.8609 7.33765L17.9609 15.6082L22.8609 18.623V7.34062V7.33765Z"
      fill="#0A0A0A"
    />
    <path
      d="M22.8633 7.34058V18.621L27.7633 15.6101L22.8633 7.34058Z"
      fill="#4B4D4D"
    />
    <path
      d="M22.8633 20.2596V24.1928C22.9553 24.062 27.7633 17.2439 27.7633 17.2409L22.8633 20.2596Z"
      fill="#4B4D4D"
    />
    <path
      d="M22.8629 20.2606L17.9629 17.2468L22.8629 24.1958V20.2586V20.2606Z"
      fill="#0A0A0A"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4440_14095"
        x1={8.84995}
        y1={25.7631}
        x2={8.84995}
        y2={3.46191}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EDCF00" />
        <stop offset={0.33} stopColor="#F0D500" />
        <stop offset={0.77} stopColor="#F9E500" />
        <stop offset={1} stopColor="#FFF100" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_4440_14095"
        x1={41.4183}
        y1={25.9258}
        x2={41.4183}
        y2={9.79266}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EDCF00" />
        <stop offset={0.59} stopColor="#F7E100" />
        <stop offset={1} stopColor="#FFF100" />
      </linearGradient>
      <radialGradient
        id="paint2_radial_4440_14095"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(2.56143 40.9984) scale(16.995 16.8793)"
      >
        <stop stopColor="#FFF100" />
        <stop offset={0.23} stopColor="#F9E500" />
        <stop offset={0.67} stopColor="#F0D500" />
        <stop offset={1} stopColor="#EDCF00" />
      </radialGradient>
    </defs>
  </svg>
)

export default memo(HardhatLogo)
