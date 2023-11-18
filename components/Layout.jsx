import { Container } from "semantic-ui-react";
import PropTypes from "prop-types";
import "semantic-ui-css/semantic.min.css";

const CustomContainer = (props) => {
  return <Container>{props.children}</Container>;
};

CustomContainer.displayName = "CustomContainer";

CustomContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomContainer;
