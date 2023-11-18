import { useState, useEffect } from "react";
import { Table } from "semantic-ui-react";
import Layout from "../components/Layout";
import product from "../etherum/product";
import RequestRow from "../components/RequestRow";

const Requests = () => {
  const [loading, setLoading] = useState(true);
  const [productCount, setProductCount] = useState(0);
  const [productsArr, setProductsArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productCount = await product.methods.total_products().call();

        const productArr = await Promise.all(
          Array(parseInt(productCount))
            .fill()
            .map((element, index) => {
              return product.methods.products(index).call();
            })
        );

        setProductCount(productCount);
        setProductsArr(productArr);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderRows = () => {
    return productsArr.map((product, index) => {
      return <RequestRow key={index} id={index} product={product} />;
    });
  };

  const { Header, HeaderCell, Row, Body } = Table;

  return (
    <Layout>
      <h3>Products</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <Header>
            <Row>
              <HeaderCell>Product SN</HeaderCell>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Brand</HeaderCell>
              <HeaderCell>Price</HeaderCell>
              <HeaderCell>Manufacture ID</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
            </Row>
          </Header>
          <Body>{renderRows()}</Body>
        </Table>
      )}
      <div>Found {productCount} Products.</div>
    </Layout>
  );
};

export default Requests;
