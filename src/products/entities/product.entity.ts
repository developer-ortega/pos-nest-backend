import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Category } from "../../categories/entities/category.entity.js";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 60 })
    name: string;

    @Column({ type: "varchar", length: 120, nullable: true, default: 'default.svg' })
    image: string;

    @Column({ type: "decimal" })
    price: number;

    @Column({ type: "int" })
    inventory: number;

    @ManyToOne(() => Category, (category) => category.products)
    category: Relation<Category>;
}
