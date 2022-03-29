import * as React from 'react';
import { SVGProps, memo } from 'react';

const GitHubLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg width={40} height={41} viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.0719 6.87405C16.4939 6.87055 13.0315 8.09634 10.3053 10.3318C7.57907 12.5672 5.76716 15.6661 5.19428 19.0732C4.6214 22.4803 5.32499 25.9729 7.17898 28.925C9.03296 31.8771 11.9161 34.0958 15.3118 35.1835C16.0698 35.3173 16.3378 34.8625 16.3378 34.4791C16.3378 34.0957 16.3378 33.2219 16.3378 32.0093C12.1323 32.892 11.245 30.0566 11.245 30.0566C10.966 29.1778 10.3733 28.4228 9.57205 27.9256C8.21336 27.034 9.68297 27.034 9.68297 27.034C10.1592 27.0989 10.614 27.2674 11.0127 27.527C11.4115 27.7865 11.7437 28.1302 11.9844 28.5319C12.1889 28.8896 12.4647 29.2049 12.7958 29.4595C13.1269 29.7142 13.5069 29.9033 13.9139 30.016C14.321 30.1287 14.7471 30.1627 15.1678 30.1161C15.5885 30.0695 15.9955 29.9432 16.3655 29.7445C16.4235 29.011 16.7513 28.3217 17.2898 27.8008C13.9439 27.4352 10.4316 26.1869 10.4316 20.6677C10.4087 19.2259 10.9613 17.8308 11.9752 16.7712C11.5236 15.5176 11.5764 14.1461 12.1231 12.9283C12.1231 12.9283 13.3893 12.5359 16.2639 14.4173C18.7322 13.7635 21.3376 13.7635 23.806 14.4173C26.6805 12.5359 27.9375 12.9283 27.9375 12.9283C28.4918 14.1332 28.5578 15.4949 28.1224 16.7445C29.1363 17.804 29.6889 19.1991 29.666 20.6409C29.666 26.2226 26.1444 27.4441 22.7893 27.774C23.1491 28.1229 23.4269 28.5423 23.6039 29.0038C23.7809 29.4653 23.853 29.9582 23.8152 30.4489C23.8152 32.3927 23.8152 33.962 23.8152 34.4345C23.8152 34.9071 24.0833 35.2727 24.8504 35.13C28.2075 34.0136 31.0475 31.7886 32.8687 28.848C34.69 25.9073 35.3753 22.4404 34.8035 19.0596C34.2318 15.6788 32.4398 12.6017 29.7441 10.372C27.0485 8.14222 23.6227 6.90329 20.0719 6.87405Z"
      fill="#0A0A0A"
    />
  </svg>
);

export default memo(GitHubLogo);
