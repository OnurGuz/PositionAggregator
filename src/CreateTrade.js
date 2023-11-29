import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import AppNavbar from './AppNavbar';

const CreateTrade = () => {
    const [formData, setFormData] = useState({
        id: '',
        bbgCode: '',
        portfolio: '',
        account: '',
        strategy: '',
        user: '',
        currency: '',
        pnl: 0.0
    });


    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.values(formData).every((value) => value)) {
            try {
                const response = await fetch('/trades', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                setSuccessMessage('Trade has been created successfully.');
                setErrorMessage('');
            } catch (error) {
                console.error('Error creating trade:', error);
                setErrorMessage('There was an error creating the trade.');
                setSuccessMessage('');
            }
        } else {
            setErrorMessage('Please fill in all fields.');
            setSuccessMessage('');
        }
    };


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div>
            {successMessage && <Alert color="success">{successMessage}</Alert>}
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
         <AppNavbar/>
            <FormGroup>
                <Label for="id">ID</Label>
                <Input type="text" name="id" id="id" onChange={handleChange} value={formData.id} />
            </FormGroup>
            <FormGroup>
                <Label for="bbgCode">BBG Code</Label>
                <Input type="text" name="bbgCode" id="bbgCode" onChange={handleChange} value={formData.bbgCode} />
            </FormGroup>
            <FormGroup>
                <Label for="portfolio">Portfolio</Label>
                <Input type="text" name="portfolio" id="portfolio" onChange={handleChange} value={formData.portfolio} />
            </FormGroup>
            <FormGroup>
                <Label for="account">Account</Label>
                <Input type="text" name="account" id="account" onChange={handleChange} value={formData.account} />
            </FormGroup>
            <FormGroup>
                <Label for="strategy">Strategy</Label>
                <Input type="text" name="strategy" id="strategy" onChange={handleChange} value={formData.strategy} />
            </FormGroup>
            <FormGroup>
                <Label for="user">User</Label>
                <Input type="text" name="user" id="user" onChange={handleChange} value={formData.user} />
            </FormGroup>
            <FormGroup>
                <Label for="currency">Currency</Label>
                <Input type="text" name="currency" id="currency" onChange={handleChange} value={formData.currency} />
            </FormGroup>
            <FormGroup>
                <Label for="pnl">P&L</Label>
                <Input type="number" name="pnl" id="pnl" onChange={handleChange} value={formData.pnl} />
            </FormGroup>
            <Button color="primary" type="submit">
                Create Trade
            </Button>
        </Form>
      </div>
    );
};

export default CreateTrade;
