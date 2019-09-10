class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :name, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :looking_for
      t.integer :distance
      t.integer :question_answer_id
      t.integer :age, null: false
      t.text :human
      t.string :gender
      t.text :about_me
      t.text :aspirations
      t.text :talent
      t.text :traits
      t.text :needs
      t.text :hobbies
      t.timestamps
    end

    add_index :users, :username, unique: true
    add_index :users, :session_token, unique: true
  end
end
