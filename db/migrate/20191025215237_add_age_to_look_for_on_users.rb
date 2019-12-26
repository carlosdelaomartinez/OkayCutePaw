class AddAgeToLookForOnUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :looking_age_lower, :integer, null: false
    add_column :users, :looking_age_higher, :integer, null: false
  end
end
