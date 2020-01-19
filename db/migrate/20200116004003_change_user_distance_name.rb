class ChangeUserDistanceName < ActiveRecord::Migration[5.2]
  def change
    rename_column :user_distances, :distance, :miles
  end
end
