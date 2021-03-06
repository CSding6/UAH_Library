/* NPM Imports */
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

/* Local Imports */
import { validateUser } from "./utils";
import { addUsers } from "./../../actions";
import { renderField } from "./../../renderers";
import { AdminNavigation } from "./../admin";
import { ADMIN_USER } from "./../paths";

class PostUser extends Component {

    onSubmit(values) {
        const { token } = this.props;
        values.access = (values.access) ? "admin" : "user";
        this.props.addUsers(token, values, () => {
            this.props.history.push(ADMIN_USER);
        });
    }

    render() {

        const { handleSubmit } = this.props;

        return (
            <div>
            <h3 className="text-center"> Add A New User </h3>
            <div className="rowContent">
            <AdminNavigation />
            <form className="postuser-form-custom-padding"
                style={{width: "90%"}}
                onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Email" type="text" name="email"
                    component={renderField} />
                <Field label="Password" type="text" name="password"
                    component={renderField} />
                <Field label="First Name" type="text" name="firstName"
                    component={renderField} />
                <Field label="Last Name" type="text" name="lastName"
                    component={renderField} />
                <Field label="Faculty" type="checkbox" name="access"
                    value="admin" component={renderField} />
                <button type="submit" className="btn btn-primary">
                    Submit</button>
                <Link to={ADMIN_USER} className="btn btn-danger">
                    Return To Users</Link>
            </form>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        token : state.currentUser.token,
    }
}

export default reduxForm({
    validate : validateUser,
    form : "PostNewUser"
})(
    connect(mapStateToProps, { addUsers })(PostUser)
);
