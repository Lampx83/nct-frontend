import React, { useEffect, useState } from "react";

import { BsTextLeft } from "react-icons/bs";
import ParagraphElement from "./ParagraphElement";
import TableContent from "./TableContent";
import { useLocation } from "react-router-dom";

const ParagraphContent = ({
  step,
  content,
  index,
  display,
  user,
  room,
  chap,
}) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const iconOpacity = isContentVisible ? 1 : 0.5;
  if (
    content.paragraph &&
    content.paragraph.elements &&
    content.paragraph.elements.length > 0
  ) {
    const paragraphText = content.paragraph.elements
      .map((element) => element.textRun?.content)
      .join("");
    let isShow =
      display === null ||
      display === "book" ||
      display === "doc" ||
      content.paragraph.bullet ||
      paragraphText.length < 200 ||
      (paragraphText.length < 400 && paragraphText.trim().endsWith(":"));
    const paragraphStyleType = content.paragraph.paragraphStyle.namedStyleType;
    const ContentComponent =
      paragraphStyleType === "HEADING_2"
        ? "h2"
        : paragraphStyleType === "HEADING_3"
        ? "h3"
        : "p";
    const className = ContentComponent === "p" ? "para" : "";

    return (
      <div>
        {!isShow ? (
          <div className="button-visibility" style={{ opacity: iconOpacity }}>
            <BsTextLeft onClick={toggleContentVisibility} />
          </div>
        ) : null}
        {!isShow && !isContentVisible ? null : (
          <ContentComponent
            style={{ textAlign: content?.paragraph?.paragraphStyle?.alignment }}
            className={`${className} ${
              content?.paragraph?.paragraphStyle?.className || ""
            }`}
          >
            {content.paragraph.elements.map((element, index) => (
              <ParagraphElement
                key={index}
                element={element}
                index={index}
                chap={chap}
              />
            ))}
          </ContentComponent>
        )}
      </div>
    );
  } else if (content.table) {
    return (
      <TableContent
        chap={chap}
        table={content.table}
        display={display}
        user={user}
        room={room}
      />
    );
  } else {
    return null;
  }
};
export default ParagraphContent;
