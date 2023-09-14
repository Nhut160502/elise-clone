import { Button, Image } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
const List = ({
  colums,
  row,
  title,
  urlTrash,
  urlList,
  trash,
  handleRemove,
  handleDelete,
}) => {
  return (
    <Wrapper>
      <Table striped hover>
        <thead>
          <tr>
            {colums?.map((colum) => (
              <th>{colum.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {colums?.map((col) => {})}
          {row?.map((data, index) => (
            <tr>
              <td key={data._id}>
                <span>{index + 1}</span>
              </td>
              <td>
                <span>{data.name}</span>
              </td>
              <td>
                <Image src={data.imgUrl} />
              </td>
              <td>
                <Link
                  className="btn btn-primary"
                  to={urlTrash && `${window.location.pathname}/${data.slug}`}
                  onClick={(e) => {
                    urlList && handleRemove();
                  }}
                >
                  {urlTrash ? "Sửa" : "Khôi Phục"}
                </Link>
                <Button
                  className="btn btn-danger "
                  onClick={() => {
                    handleDelete(data._id);
                  }}
                >
                  {urlTrash ? "Xóa" : "Xóa Vĩnh Viển"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  img {
    width: 400px;
  }
  button {
    margin-right: 10px;
  }
  a {
    padding: 0 8px;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export default List;
