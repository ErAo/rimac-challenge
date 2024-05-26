export default function HighlightText ({ text, highlight }) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <strong key={index} className="highlight">{part}</strong>
          ) : (
            part
          )
        )}
      </>
    );
  };