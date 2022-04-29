import User from "../components/User";
function Users({ users }) {
  return (
    <>
      <h1>List of Users</h1>
      {users.map((user) => {
        return (
          <div
            style={{
              border: `1px solid rgb(${getColor()},${getColor()},${getColor()})`,
              margin: "1rem",
            }}
            key={user.id}
          >
            <User user={user} />
          </div>
        );
      })}
    </>
  );
}
function getColor() {
  return Math.random() * 255;
}
export default Users;
export async function getStaticProps() {
  //executed at build time
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return {
    props: {
      users: data,

      //! we can use this props in component
    },
  };
}
