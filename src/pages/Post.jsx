import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import Button from "../components/Button";

const Post = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { slug } = useParams();
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  const deletePost = () => {
    databaseService.deleteFile(post.$id).then((status) => {
      if (status) {
        databaseService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            className="rounded-xl"
            src={databaseService.previewFile(post.featuredImage)}
            alt={post.title}
          />
          {isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <div>
            <h1 className="text-2xl font-bold">{post.title}</h1>
            <div className="browser-css">{parse(post.content)}</div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
