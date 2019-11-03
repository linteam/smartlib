import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from './select';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = willRender => {
        let options = { abortEarly: false };
        let errors = {};
        let { error: joiErr } = Joi.validate(this.state.data, this.schema, options);
        if (!joiErr) {
            if (willRender) this.setState({ errors: {} });
            return true;
        } else {
            //console.log('Validation Error: ', joiErr.details);
            if (willRender) {
                for (let item of joiErr.details) {
                    errors[item.path[0]] = item.message;
                }
                this.setState({ errors })
            };
            return false;
        }
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schemaOP = { [name]: this.schema[name] };
        let errors = { ...this.state.errors };
        const { error: joiErr } = Joi.validate(obj, schemaOP);
        let retVal = false;
        if (!joiErr) {
            retVal = true;
            errors[name] = "";
        } else {
            errors[name] = joiErr.details[0].message;
        }
        this.setState({ errors });
        return retVal;
    };

    submitHandler = e => {
        //Sumbit normalde tum sayfalari yeniden yukletiyor bunun onune gecmek icin.
        e.preventDefault();
        console.log("Submitted");

        if (!this.validate(true)) return; //Will not call the server
        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        this.validateProperty(input);
        let data = { ...this.state.data };
        data[input.name] = input.value; //yazilan metni state icindeki ilgili objeye atiyoruz
        this.setState({ data });
    };

    //state.data objesinden Joi schema'si olusturur.
    buildSchema(data) {
        let schema = {};
        Object.keys(data).forEach(item => {
            schema[item] = Joi.string()
                .required()
                .label(item);
        });
        return schema;
    }

    renderButton = (label) => {
        return (
            <button disabled={!this.validate(false)} className="btn btn-primary">
                {label}
            </button>
        );
    };

    //extra -> type = "text", autoFocus=false
    renderInput = (name, label, extra = { type: "text", autoFocus: false }) => {
        let { data, errors } = this.state;
        return (
            <Input
                name={name}
                label={label}
                error={errors[name]}
                type={extra.type}
                value={data[name]}
                onChange={this.handleChange}
                autoFocus={extra.autoFocus}
            />
        );
    };

    renderDropDownList = (
        name,
        label,
        options = [{ value: "volvo", text: "Volvo" }]
    ) => {
        let { errors, data } = this.state;
        return (
           <Select  name={name}
                label={label}
                error={errors[name]}
                options={options}
                value={data[name]}
                onChange={this.handleChange} />
        );
    };
}

export default Form;
