"use client";

/** Animated scoring graphic based on /animation/Graphic/Graphic/Animation.svg */
export function WritingScoringGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className="writing-score-graphic size-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Track */}
        <path
          d="M200 392C305.968 392 392 305.968 392 200C392 94.0323 305.968 8 200 8C94.0323 8 8 94.0323 8 200C8 305.968 94.0323 392 200 392V392"
          strokeWidth="8"
          stroke="#E2E8F0"
        />
        {/* Animated progress arc */}
        <path
          className="writing-score-arc"
          d="M392 200C392 94.0323 305.968 8 200 8C94.0323 8 8 94.0323 8 200C8 305.968 94.0323 392 200 392C305.968 392 392 305.968 392 200V200"
          strokeWidth="12"
          strokeLinecap="round"
          stroke="#0047C3"
          pathLength={100}
        />

        {/* Paper (floats) */}
        <g className="writing-score-paper">
          <rect
            x="98.3766"
            y="93.6631"
            width="191"
            height="239"
            rx="11.5"
            transform="rotate(-3 98.3766 93.6631)"
            fill="white"
          />
          <rect
            x="98.3766"
            y="93.6631"
            width="191"
            height="239"
            rx="11.5"
            transform="rotate(-3 98.3766 93.6631)"
            stroke="#EFF6FF"
          />
          <rect
            x="124.962"
            y="132.82"
            width="142"
            height="12.0065"
            rx="4"
            transform="rotate(-3 124.962 132.82)"
            fill="#F3F4F6"
          />
          <rect
            x="126.428"
            y="160.788"
            width="118.323"
            height="11.9966"
            rx="4"
            transform="rotate(-3 126.428 160.788)"
            fill="#F3F4F6"
          />
          <rect
            x="127.894"
            y="188.746"
            width="94.66"
            height="11.9966"
            rx="4"
            transform="rotate(-3 127.894 188.746)"
            fill="#F3F4F6"
          />
          <rect
            x="129.358"
            y="216.705"
            width="142"
            height="11.9966"
            rx="4"
            transform="rotate(-3 129.358 216.705)"
            fill="#F3F4F6"
          />
          <rect
            x="130.824"
            y="244.663"
            width="106.506"
            height="11.9966"
            rx="4"
            transform="rotate(-3 130.824 244.663)"
            fill="#F3F4F6"
          />
          <path
            d="M149.006 285.775C153.774 274.844 159.016 272.967 164.733 280.144C170.449 287.322 175.719 285.977 180.543 276.111C185.367 266.245 190.804 268.097 196.856 281.665C202.908 295.234 208.066 291.759 212.331 271.241"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#0047C3"
            fill="none"
          />
        </g>

        {/* Pencil */}
        <g className="writing-score-pencil origin-[280px_330px]">
          <path
            d="M236.694 328.766C235.836 325.565 237.736 322.275 240.937 321.417L258.321 316.759L266.603 347.669L249.219 352.327C246.018 353.184 242.728 351.285 241.87 348.084L236.694 328.766Z"
            fill="#FACC15"
          />
          <path
            d="M260.253 316.242L268.535 347.151L264.671 348.186L256.389 317.277L260.253 316.242Z"
            fill="#EAB308"
          />
          <rect
            x="258.321"
            y="316.76"
            width="15.9951"
            height="31.9998"
            transform="rotate(-15 258.321 316.76)"
            fill="#D1D5DB"
          />
          <path
            d="M273.771 312.62L333.658 296.573C334.725 296.288 335.822 296.921 336.107 297.988L343.355 325.036C343.641 326.103 343.008 327.199 341.941 327.485L282.054 343.532L273.771 312.62Z"
            fill="#0047C3"
          />
          <path
            d="M335.591 296.06L354.912 290.883L363.195 321.795L343.874 326.972L335.591 296.06Z"
            fill="#FED7AA"
          />
          <path
            d="M351.701 302.09L357.5 300.536L360.606 312.128L354.807 313.681L351.701 302.09Z"
            fill="#1E293B"
          />
        </g>
      </svg>
    </div>
  );
}
