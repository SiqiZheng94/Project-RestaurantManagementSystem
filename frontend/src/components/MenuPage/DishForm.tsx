import { Button, Form, Input, Select, Switch } from "antd";

export default function DishForm({

                                     onCancel,
                                     onFinish,

                                 }: any) {
    const [form] = Form.useForm();

    return (
        <Form form={form}
              onFinish={onFinish}
        >
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
                        message: "Please select the category",
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
