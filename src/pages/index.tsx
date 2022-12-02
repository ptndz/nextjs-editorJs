import Link from "next/link";
export default function Home({ listPost }) {
  return (
    <div>
      <div>
        <h1>
          <Link href={"/editor"}>editor</Link>
        </h1>
      </div>

      <div>
        {listPost.data.length > 0 ? (
          <div>
            {listPost.data.map((val, index) => (
              <div key={index}>
                <h2>{val.title}</h2>
                <p>{val.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/list`);
  const listPost = await res.json();

  // Pass data to the page via props
  return { props: { listPost } };
}
