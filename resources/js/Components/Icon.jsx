export default function Icon({ stroke = "currentColor", strokeLinecap = "round", strokeLinejoin = "round", strokeWidth = "2", d = "M12 4v16m8-8H4" }) {
    return (
        <svg className="fill-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                stroke={stroke}
                strokeLinecap={strokeLinecap}
                strokeLinejoin={strokeLinejoin}
                strokeWidth={strokeWidth}
                d={d}
            />
        </svg>
    );
}
