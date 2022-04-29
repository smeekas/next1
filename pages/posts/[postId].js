import { useRouter } from "next/router";

function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <h4>Loading....</h4>;
  }
  return (
    <>
      <h2>
        {post.id} {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  );
}

// export async function getStaticPaths() {
//   const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const data = await response.json();
//   const path = data.map((item) => {
//     return { params: { postId: item.id.toString() } };
//   });

//   //------------------------------------------
//   // return {
//   //   paths: [
//   //     { params: { postId: "1" } },
//   //     { params: { postId: "2" } },
//   //     { params: { postId: "3" } },
//   //     { params: { postId: "4" } },
//   //     { params: { postId: "5" } },
//   //   ],
//   //   fallback: false,
//   // };  //!instead of manually typing we can call API and make one path object

//   //!======================================================
//   return {
//     paths: path,
//     fallback: false,
//   };
// }
export async function getStaticPaths() {
  return {
    paths: [
      { params: { postId: "1" } },
      { params: { postId: "2" } },
      { params: { postId: "3" } },
    ],
    fallback: true,
  };

  //!nextJS will prefetch page with postId 1,2,3, and for rest of them it will serve fallback page until it frtvhing page and render it
}

export async function getStaticProps(context) {
  //!if we don't have getStaticPaths then it will give error
  //!because postId can be 1,2,3,4,...,100000
  //! so we need to specify all possible postIds with getStaticPaths
  const { params: postId } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId.postId}`      
  );
  const data = await response.json();


  if(!data.id){
    //! our post ranges from 1..100 if we ask for 101 it will crash
    //! so to serve 404 page we return notFound=true
return {
  notFound:true
}

  }
  return {
    props: {
      post: data,
    },
  };
}
export default Post;
