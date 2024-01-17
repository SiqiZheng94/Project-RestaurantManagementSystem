import {Button, Form, Input, Select, Switch} from "antd";
import {useEffect} from "react";

export default function DishEditForm({ dish, onCancel, onFinish, updateThisItem}: any) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (dish) {
            form.setFieldsValue(dish);
        }
    }, [dish, form]);

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                // Combine existing dish data with form values
                const updatedDish = { ...dish, ...values };
                // Call the updateThisDish function with the updated dish data
                updateThisItem(updatedDish);
                onFinish();
            })
            .catch((errorInfo) => {
                console.log("Validation failed:", errorInfo);
            });
    };

    return (
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Please enter the dish name",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="category"
                label="Category"
                rules={[
                    {
                        required: true,
                        message: "Please enter the category",
                    },
                ]}
            >
                <Select>
                    <Select.Option value="SIDE_DISHES">SIDE_DISHES</Select.Option>
                    <Select.Option value="MAKI_ROLLS">MAKI_ROLLS</Select.Option>
                    <Select.Option value="NIGIRI_GUNKAN">NIGIRI_GUNKAN</Select.Option>
                    <Select.Option value="TEMAKI">TEMAKI</Select.Option>
                    <Select.Option value="YAKI_VEGGIE">YAKI_VEGGIE</Select.Option>
                    <Select.Option value="FRY">FRY</Select.Option>
                    <Select.Option value="DRINK">DRINK</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: "Please enter the description",
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                name="price"
                label="Price"
                rules={[
                    {
                        required: true,
                        type: "number",
                        min: 0,
                        // Convert input values to floating point numbers
                        transform: (value) => parseFloat(value),
                        message: "Please enter a valid price",
                    },
                ]}
            >
                <Input type="number" step="0.01" />
            </Form.Item>

            <Form.Item name="vegetarian" label="Vegetarian" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name="availability" label="Availability" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
            </Form.Item>
        </Form>
    );
}