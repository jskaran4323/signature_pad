defmodule SignaturePad.Repo do
  use Ecto.Repo,
    otp_app: :signature_pad,
    adapter: Ecto.Adapters.Postgres
end
