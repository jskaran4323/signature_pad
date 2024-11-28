defmodule SignaturePadWeb.PageController do
  use SignaturePadWeb, :controller

  def show(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :show, layout: false)
  end

  def save(conn, %{"signature" => data_url}) do
  case decode_base64(data_url) do
    {:ok, binary} ->
      # Save the binary data as an image
      file_path = "priv/static/signatures/signature_#{System.unique_integer()}.png"
      File.write!(file_path, binary)

      json(conn, %{message: "Signature saved successfully!", path: file_path})

    {:error, reason} ->
      conn
      |> put_status(:unprocessable_entity)
      |> json(%{error: reason})
  end
end

defp decode_base64(data_url) do
  case String.split(data_url, ",") do
    ["data:image/png;base64", base64] -> Base.decode64(base64)
    _ -> {:error, "Invalid data URL"}
  end

end

def password_generator(conn, _params) do
   
    render(conn, :password_generator, layout: false)
  end

def generate_password(conn, %{"length"=> length_param}) do
length =
    case length_param do
      int when is_integer(int) -> int
      str when is_binary(str) -> String.to_integer(str)

    end

  if length <6 && length >128 do
    conn
    |> put_status(:unprocessable_entity)
    |> json(%{error: "length should be in between 6 to 128"})
  else
    password=password_generator(length)
    json(conn, %{password: password})
  end

end

defp password_generator(length) do
  charset= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
  charset
     |> String.graphemes()
    |>Enum.take_random(length)
  |> Enum.join()
end


end
