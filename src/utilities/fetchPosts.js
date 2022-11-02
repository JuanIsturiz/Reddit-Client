export const fetchPosts = async (sub) => {
  const res = await fetch(`https://www.reddit.com/r/${sub}.json`);
  const {
    data: { children },
  } = await res.json();
  const destructured = children.map((child) => {
    const { data } = child;
    const {
      score,
      title,
      id,
      url_overridden_by_dest: url,
      author,
      num_comments: commentsNum,
      created,
    } = data;
    return {
      score,
      title,
      id,
      url_overridden_by_dest: url,
      author,
      num_comments: commentsNum,
      created,
      comments: [],
    };
  });
  return destructured;
};
