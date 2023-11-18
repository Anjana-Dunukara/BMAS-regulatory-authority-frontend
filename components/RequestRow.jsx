import { Table, Button } from "semantic-ui-react";
import productContract from "../etherum/product";
import PropTypes from "prop-types";

const RequestRow = (props) => {
  const onApprove = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length === 0) {
        console.error("No Ethereum accounts found.");
        return;
      }

      console.log("Ethereum accounts:", accounts);
      await productContract.methods.approveProduct(props.id).send({
        from: accounts[0],
      });

      console.log("Transaction sent successfully!");
      window.location.reload(true);
    } catch (err) {
      console.error("Error sending transaction:", err.message);
    }
  };

  const { Row, Cell } = Table;
  const { product } = props;

  return (
    <Row disabled={product.approved} positive={!product.approved}>
      <Cell>{product.prodSN}</Cell>
      <Cell>{product.name}</Cell>
      <Cell>{product.brand}</Cell>
      <Cell>{product.price}</Cell>
      <Cell>{product.manufacturer_id}</Cell>
      <Cell>
        {product.approved ? null : (
          <Button color="teal" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
    </Row>
  );
};

RequestRow.propTypes = {
  id: PropTypes.number.isRequired,
  product: PropTypes.shape({
    prodSN: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    manufacturer_id: PropTypes.string.isRequired,
    approved: PropTypes.bool.isRequired,
  }).isRequired,
};

export default RequestRow;
