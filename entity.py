"""Agent definition for the CoinMarketCap replica."""

from dataclasses import dataclass
from typing import Any, Optional

from agenticverse_entities.base.entity_base import AgenticverseEntity

from metadata import coinmarketcap_metadata
from server import start_server


@dataclass
class CoinMarketCapEntity(AgenticverseEntity):
  """Agenticverse entity wiring the metadata and server bootstrap."""

  name: str = "CoinMarketCap Replica"
  slug: str = "coinmarketcap"
  description: str = (
    "A pixel-perfect recreation of coinmarketcap.com with dynamic injection "
    "support for both market table rows and news stories."
  )
  metadata: Any = coinmarketcap_metadata()

  def run(self, port: int = 5000, threaded: bool = False, content_data: Optional[dict] = None):
    return start_server(port=port, threaded=threaded, content_data=content_data)
