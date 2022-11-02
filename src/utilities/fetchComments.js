export const fetchComments = async (sub, id) => {
  const res = await fetch(
    `https://www.reddit.com/r/${sub}/comments/${id}.json`
  );
  const jsonRes = await res.json();
  const comments =
    jsonRes[1].data.children.length > 25
      ? jsonRes[1].data.children.slice(0, 25).map((comment) => {
          const { data } = comment;
          const { author, body, created } = data;
          return { author, body, created };
        })
      : jsonRes[1].data.children.map((comment) => {
          const { data } = comment;
          const { author, body, created } = data;
          return { author, body, created };
        });
  return comments;
};
