import Meta from "antd/es/card/Meta";
import {Card} from "antd";
import {Dish} from "../model/Dish.ts";

type MenuOrderingProps = {
    dishes: Dish[],
    getDishes: () => void,
}
export default function MenuOrdering(props: MenuOrderingProps){
   const dishesList = props.dishes;
    return (
        <div className={"menu-display-container"}>
            {dishesList.map((dish: Dish) => (
                <Card className={"menu-card"}
                    key={dish._id} // 添加一个唯一的 key 属性
                    hoverable
                    style={{ width: 230, height: 380 }}
                    cover={<img alt="example" src={dish.imageURL} />} // 使用 dish 的图片 URL
                    // cover={<img alt="example" src="https://i.pinimg.com/564x/1c/67/42/1c6742b02dddb4e968266994740565d6.jpg" style={{ objectFit: 'cover', width: '100%', height: '200px' }} />}
                >
                    <Meta title={dish.name} description={dish.description} />
                </Card>
            ))}
        </div>

    );
}
