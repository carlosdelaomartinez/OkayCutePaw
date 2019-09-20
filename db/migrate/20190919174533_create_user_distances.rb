class CreateUserDistances < ActiveRecord::Migration[5.2]
  def change
    create_table :user_distances do |t|
      t.integer :user_id
      t.integer :distant_user_id, null: false
      t.float :distance, null: false
      t.timestamps
    end

    add_index :user_distances, :user_id
  end
end
