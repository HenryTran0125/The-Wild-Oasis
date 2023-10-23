import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins can not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasPathImage = newCabin?.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasPathImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create/Edit cabin
  let query = supabase.from("cabins");

  //A.Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B.Edit cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins can not be created");
  }

  //2.Upload image
  if (hasPathImage) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.Delete the cabin if there was an error uploading image
  if (storageError) {
    const { data, error } = await supabase
      .from("cabins")
      .delete()
      .eq("id", data.id);

    console.error(error);
    throw new Error(
      "Cabins image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins can not be deleted");
  }

  return data;
}
