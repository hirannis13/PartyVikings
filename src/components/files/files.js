import React from "react";
import "./files.css";
import PostCard from "../utils/PostCard";

function Files() {
  return (
    <>
      <div className="files">Files</div>
      <PostCard
        imageUrl="https://images.unsplash.com/photo-1601312378427-822b2b41da35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
        title="A post about pianos"
        description="If you want to know more about how to play piano expand this post"
        buttonText="Open"
        postId="50asd"
      />
    </>
  );
}

export default Files;
