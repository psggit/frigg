import React from 'react'

export default function getIcon(name) {
  switch (name) {
    case 'gear':
    return (
      <svg style={{pointerEvents: 'none'}} width="20px" height="20px" version="1.1" id="Capa_1"  x="0px" y="0px"
         viewBox="0 0 52 52">
      <path style={{fill: '#E7ECED'}} d="M50.219,21h-2.797c-0.552-2.375-1.486-4.602-2.739-6.613l1.978-1.978
        c0.695-0.695,0.695-1.823,0-2.518l-4.553-4.553c-0.695-0.695-1.823-0.695-2.518,0l-1.978,1.978C35.602,6.064,33.375,5.13,31,4.578
        V1.781C31,0.797,30.203,0,29.219,0h-6.439C21.797,0,21,0.797,21,1.781v2.797c-2.375,0.552-4.602,1.486-6.613,2.739L12.41,5.339
        c-0.695-0.695-1.823-0.695-2.518,0L5.339,9.892c-0.695,0.695-0.695,1.823,0,2.518l1.978,1.978C6.064,16.398,5.13,18.625,4.578,21
        H1.781C0.797,21,0,21.797,0,22.781v6.439C0,30.203,0.797,31,1.781,31h2.797c0.552,2.375,1.486,4.602,2.739,6.613L5.339,39.59
        c-0.695,0.696-0.695,1.823,0,2.518l4.553,4.553c0.695,0.695,1.823,0.695,2.518,0l1.978-1.978c2.011,1.252,4.238,2.187,6.613,2.739
        v2.797C21,51.203,21.797,52,22.781,52h6.439C30.203,52,31,51.203,31,50.219v-2.797c2.375-0.552,4.602-1.486,6.613-2.739l1.978,1.978
        c0.695,0.695,1.823,0.695,2.518,0l4.553-4.553c0.695-0.695,0.695-1.823,0-2.518l-1.978-1.978c1.252-2.01,2.186-4.238,2.739-6.613
        h2.797C51.203,31,52,30.203,52,29.219v-6.439C52,21.797,51.203,21,50.219,21z M26,35c-4.971,0-9-4.03-9-9c0-4.971,4.029-9,9-9
        s9,4.029,9,9C35,30.97,30.971,35,26,35z"/>
      <path style={{fill: '#C7CAC7'}} d="M26,13c-7.18,0-13,5.82-13,13s5.82,13,13,13s13-5.82,13-13S33.18,13,26,13z M26,35
        c-4.971,0-9-4.03-9-9c0-4.971,4.029-9,9-9s9,4.029,9,9C35,30.97,30.971,35,26,35z"/>
      </svg>
    )

    case 'filter':
      return (
        <svg fill="#333" version="1.1" id="Capa_1" x="0px" y="0px"
        	 width="18px" height="18px" viewBox="0 0 971.986 971.986">
        <g>
        	<path d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3
        		c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873
        		c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z"/>
        </g>
        </svg>
      )
    case 'upload':
      return (
        <svg style={{ pointerEvents: 'none' }} fill="#dfdfdf" version="1.1" id="Capa_1" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 433.5 433.5">
        <g>
        	<g id="file-upload">
        		<polygon points="140.25,331.5 293.25,331.5 293.25,178.5 395.25,178.5 216.75,0 38.25,178.5 140.25,178.5"/>
        		<rect x="38.25" y="382.5" width="357" height="51"/>
        	</g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        </svg>
      )

  case 'down-arrow':
      return (
        <svg fill="#9b9b9b" version="1.1" id="Capa_1"  x="0px" y="0px" width="20px" height="20px" viewBox="0 0 438.533 438.533">
        <g>
        	<path d="M409.133,109.203c-19.608-33.592-46.205-60.189-79.798-79.796C295.736,9.801,259.058,0,219.273,0
        		c-39.781,0-76.47,9.801-110.063,29.407c-33.595,19.604-60.192,46.201-79.8,79.796C9.801,142.8,0,179.489,0,219.267
        		c0,39.78,9.804,76.463,29.407,110.062c19.607,33.592,46.204,60.189,79.799,79.798c33.597,19.605,70.283,29.407,110.063,29.407
        		s76.47-9.802,110.065-29.407c33.593-19.602,60.189-46.206,79.795-79.798c19.603-33.596,29.403-70.284,29.403-110.062
        		C438.533,179.485,428.732,142.795,409.133,109.203z M361.733,204.705L232.119,334.324c-3.614,3.614-7.9,5.428-12.849,5.428
        		c-4.948,0-9.229-1.813-12.847-5.428L76.804,204.705c-3.617-3.615-5.426-7.898-5.426-12.845c0-4.949,1.809-9.235,5.426-12.851
        		l29.119-29.121c3.621-3.618,7.9-5.426,12.851-5.426c4.948,0,9.231,1.809,12.847,5.426l87.65,87.65l87.65-87.65
        		c3.614-3.618,7.898-5.426,12.847-5.426c4.949,0,9.233,1.809,12.847,5.426l29.123,29.121c3.621,3.616,5.428,7.902,5.428,12.851
        		C367.164,196.807,365.357,201.09,361.733,204.705z"/>
        </g>
        </svg>
      )

  case 'cross-circle':
      return (
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        	 viewBox="0 0 51.976 51.976">
        	<g>
        		<path d="M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0
        			C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778
        			c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828
        			c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828
        			l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"/>
        	</g>
        </svg>
      )
  }
}
