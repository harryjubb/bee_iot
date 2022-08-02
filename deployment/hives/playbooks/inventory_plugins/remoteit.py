from ansible.plugins.inventory import BaseInventoryPlugin

from pprint import pprint

DOCUMENTATION = """
  name: remoteit
  author: Harry Jubb
  version_added: "2.1"  # for collections, use the collection version, not the Ansible version
  short_description: Connect with remoteit
  description:
      - This plugin connects to hosts via remoteit
"""

class InventoryModule(BaseInventoryPlugin):
    """
    Ansible plugin to establish remoteit connections (when the correct host
    variables are set) and set hostname and port accordingly.
    """

    NAME = "remoteit"

    def verify_file(self, path):
        """
        Return whether the inventory file given is valid for this plugin.
        """

        return super(InventoryModule, self).verify_file(
            path
        )

    def parse(self, inventory, loader, path, cache=False):

        # Call base method to ensure properties are available for use with other helper methods
        super(InventoryModule, self).parse(inventory, loader, path, cache)

        # This method will parse 'common format' inventory sources and
        # update any options declared in DOCUMENTATION as needed
        config = self._read_config_data(path)

        pprint(config)
        pprint(self.inventory)
        pprint(dir(self.inventory))
        pprint(type(self.inventory))
        pprint(self.inventory.hosts)
        pprint(self.inventory.groups)
        pprint(self.inventory.groups["all"])
        pprint(dir(self.inventory.groups["all"]))
        pprint(self.inventory.groups["all"].hosts)
        pprint(self.inventory.groups["ungrouped"])
        pprint(dir(self.inventory.groups["ungrouped"]))
        pprint(self.inventory.groups["ungrouped"].hosts)

        raise
