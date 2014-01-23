class RenameColumnInPhotos < ActiveRecord::Migration
  def up
    rename_column :photos, :order, :order_id
  end

  def down
    rename_column :photos, :order_id, :order
  end
end
