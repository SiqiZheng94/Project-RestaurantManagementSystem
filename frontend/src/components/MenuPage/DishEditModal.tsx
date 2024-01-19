import { Form, Modal} from "antd";
import {useEffect} from "react";
import DishForm from "./DishForm.tsx";

export default function DishEditModal({ visible, dish, onCancel, onFinish, updateThisItem}: any) {
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
                updateThisItem(dish._id, updatedDish);
                onFinish();
            })
            .catch((errorInfo) => {
                console.log("Validation failed:", errorInfo);
            });
    };

    return (
        <Modal
            title="Edit Dish"
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <DishForm
                onCancel={onCancel}
                onFinish={handleSubmit}
            />

        </Modal>
    );
}