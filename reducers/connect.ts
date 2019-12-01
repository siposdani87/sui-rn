import { connect } from 'react-redux';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps() {
    return {};
}

export default (screenComponent) => {
    return connect(mapStateToProps, mapDispatchToProps)(screenComponent);
};
