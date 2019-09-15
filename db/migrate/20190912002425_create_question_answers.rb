class CreateQuestionAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :question_answers do |t|
      t.integer :question_id, null: false
      t.boolean :answer, null: false 
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :question_answers, [:user_id, :question_id], unique: true
  end
end
