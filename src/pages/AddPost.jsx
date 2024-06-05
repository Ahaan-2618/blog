import Container from "../components/container/Container";
import PostForm from "../components/post-form/postForm";

const AddPost = () => {
  return (
    <div className="py-6">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPost;
