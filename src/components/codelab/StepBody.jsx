// StepBody.js
import React from "react";
import ParagraphContent from "./ParagraphContent";

const StepBody = ({ content, display, user, room, chap }) => {
  const groupedParagraphs = groupParagraphsByList(content);

  const renderParagraphs = (paragraphs, nestingLevel) => {
    return (
      <>
        {paragraphs.map((group, index) => (
          <React.Fragment key={index}>
            {group.nestedParagraphs ? (
              <ul>
                <li>
                  <ParagraphContent
                    content={group.paragraph}
                    display={display}
                    user={user}
                    room={room}
                    chap={chap}
                  />
                  {renderParagraphs(group.nestedParagraphs, nestingLevel + 1)}
                </li>
              </ul>
            ) : (
              <ParagraphContent
                content={group.paragraph}
                display={display}
                user={user}
                room={room}
                chap={chap}
              />
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return <div>{renderParagraphs(groupedParagraphs, 0)}</div>;
};

const groupParagraphsByList = (paragraphs) => {
  if (!paragraphs || !Array.isArray(paragraphs)) {
    return [];
  }

  const grouped = [];
  const stack = []; // Stack to keep track of nested levels

  paragraphs.forEach((paragraph) => {
    if (paragraph && paragraph.paragraph && paragraph.paragraph.bullet) {
      const { listId, nestingLevel } = paragraph.paragraph.bullet;
      const newItem = { paragraph, nestedParagraphs: [] };

      if (nestingLevel === undefined || nestingLevel === 0) {
        // Root level
        grouped.push(newItem);
        stack.length = 0; // Clear stack
        stack.push(newItem);
      } else {
        // Nested level
        while (stack.length > nestingLevel) {
          stack.pop(); // Go up the stack to the correct nesting level
        }
        const parent = stack[stack.length - 1];
        if (parent) parent.nestedParagraphs.push(newItem);
        stack.push(newItem);
      }
    } else {
      // Non-bulleted paragraph
      grouped.push({ paragraph });
    }
  });

  return grouped;
};

export default StepBody;
