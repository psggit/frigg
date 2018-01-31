import React from 'react'

export function getIcon(name) {
  switch (name) {
    case 'pause':
      return (
        <svg fill="#FFFFFF" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 232.679 232.679">
          <g id="Pause">
          	<path style={{fillRule: 'evenodd', clipRule: 'evenodd'}} d="M80.543,0H35.797c-9.885,0-17.898,8.014-17.898,17.898v196.883
          		c0,9.885,8.013,17.898,17.898,17.898h44.746c9.885,0,17.898-8.013,17.898-17.898V17.898C98.44,8.014,90.427,0,80.543,0z M196.882,0
          		h-44.746c-9.886,0-17.899,8.014-17.899,17.898v196.883c0,9.885,8.013,17.898,17.899,17.898h44.746
          		c9.885,0,17.898-8.013,17.898-17.898V17.898C214.781,8.014,206.767,0,196.882,0z"/>
          </g>
        </svg>
      )
    case 'play':
      return (
        <svg fill="#FFFFFF" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 41.999 41.999">
        <path d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40
        	c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20
        	c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"/>
        </svg>
      )
    case 'search':
      return (
        <svg version="1.1" id="Capa_1" x="0px" y="0px"
        	 viewBox="0 0 451 451" >
        <g>
        	<path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3
        		s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4
        		C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3
        		s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z"/>
        </g>
        </svg>
      )
    case 'cross':
      return (
        <svg version="1.1" id="Capa_1" x="0px" y="0px"
          	 viewBox="0 0 52 52">
          <g>
          	<path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
          		S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
          	<path strok-width="2" d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0
          		s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36
          		s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293
          		c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z"/>
          </g>
        </svg>
    )
    case 'success':
      return (
        <svg width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 426.667 426.667">
        <path d="M213.333,0C95.518,0,0,95.514,0,213.333s95.518,213.333,213.333,213.333
          c117.828,0,213.333-95.514,213.333-213.333S331.157,0,213.333,0z M174.199,322.918l-93.935-93.931l31.309-31.309l62.626,62.622
          l140.894-140.898l31.309,31.309L174.199,322.918z"/>
        </svg>
      )
     case 'warning':
      return (
        <svg width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 286.054 286.054">
        <g>
          <path d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027
            c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236
            c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209
            S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972
            c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723
            c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843
            C160.878,195.732,152.878,187.723,143.036,187.723z"/>
        </g>
        </svg>
      )
    default:

  }
}