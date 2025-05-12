export const RatingIcon = ({ className , width }) => (
  <svg
    width={width}
    height="28"
    viewBox={`0 0 ${{width}} 28`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width={width} height="24" rx="2" fill="#FF7801" />

    <mask id="path-3-inside-1_330_14565" fill="white">
      <path d="M12 24H20V28H12V24Z" />
    </mask>

    <path
      d='M12 24V20H8V24H12ZM20 24H24V20H20V24ZM12 28H20V20H12V28ZM16 24V28H24V24H16ZM16 28V24H8V28H16Z'
      fill='#FF7801'
      mask='url(#path-3-inside-1_330_14565)'
      transform={width === 55 ? "translate(11, 0)" : ""}
    />
  </svg>
);
