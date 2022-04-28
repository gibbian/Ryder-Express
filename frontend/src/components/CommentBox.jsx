import React, { useState, useRef } from "react";
import cn from "classnames";
import useDynamicHeightField from "./useDynamicHeightField";
import "./style.css";


const INITIAL_HEIGHT = 46;

export default function CommentBox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const outerHeight = useRef(INITIAL_HEIGHT);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  useDynamicHeightField(textRef, commentValue);

  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  };

  const onChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("send the form data somewhere");
  };

  return (
    <div className="container" id="comment_box">
      
      <form id="comment_box"
        onSubmit={onSubmit}
        ref={containerRef}
        className={cn("comment-box", {
          expanded: isExpanded,
          collapsed: !isExpanded,
          modified: commentValue.length > 0
        })}
        style={{
          minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
        }}
      >
        <div className="header" id="comment_box">
          <div className="user" id="comment_box">
            <img
              src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
              alt="User avatar"
              id="comment_box"
            />
            <span id="comment_box" >User Name</span>
          </div>
        </div>
        <label htmlFor="comment" id="comment_box">What are your thoughts?</label>
        <textarea
        
          ref={textRef}
          onClick={onExpand}
          onFocus={onExpand}
          onChange={onChange}
          className="comment-field"
          placeholder="Make a review for the company."
          value={commentValue}
          name="comment"
          id="comment comment_box"
        />
        <div className="actions" id="comment_box">
          <button type="button" className="cancel" onClick={onClose} id="comment_box">
            Cancel
          </button>
          <button type="submit" disabled={commentValue.length < 1} id="comment_box">
            Respond
          </button>
        </div>
      </form>
    </div>
  );
}
