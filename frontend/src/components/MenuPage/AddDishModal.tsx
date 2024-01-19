import {Form,  Modal} from "antd";
import DishForm from "./DishForm.tsx";


export default function AddDishModal({ visible, onCancel, createNewDish }: any){
    const [form] = Form.useForm();


    return (
        <Modal
            title="Add New Dish"
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <DishForm
                onCancel={onCancel}
                onFinish={(values) => {
                    createNewDish(values);
                    // then reset all fields in form
                    form.resetFields();
                }}
            />

        </Modal>
    );
};
