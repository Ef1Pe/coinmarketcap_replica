"""Metadata schema for the CoinMarketCap replica entity."""

from agenticverse_entities.base.metadata_base import BaseMetadata, Metadata


class coinmarketcap_metadata(BaseMetadata):
  """Describes the parameters that may be injected into the replica."""

  def get_metadata(self) -> Metadata:
    return Metadata(
      domain="*.coinmarketcap.com",
      parameters={
        "port": "integer",
        "section": "string",  # index, news
        "rank": "integer",
        "asset_name": "string",
        "symbol": "string",
        "price": "number",
        "market_cap": "number",
        "volume_24h": "number",
        "circulating_supply": "string",
        "dominance": "number",
        "change_24h": "number",
        "change_7d": "number",
        "change_30d": "number",
        "sparkline_points": "array",
        "title": "string",
        "description": "string",
        "author": "string",
        "timestamp": "string",
        "tag": "string"
      }
    )
