export default function Image({ src, alt, className, breakpoints }) {
    
    return (
        <picture className={className}>
            {breakpoints.map((breakpoint, index) => (
                <source
                    key={index}
                    media={`(min-width: ${breakpoint.minWidth}px)`}
                    srcSet={breakpoint.src}
                />
            ))}
            <img src={src} alt={alt} />
        </picture>
    )
}