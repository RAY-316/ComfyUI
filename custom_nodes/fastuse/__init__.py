__version__ = '1.0.55'

import importlib
import os
import yaml

NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}

cwd_path = os.path.dirname(os.path.realpath(__file__))
config_path = os.path.join(cwd_path, "config.yaml")
web_default_version = 'release'
basic_lists = [
    'patch', 'sampling',
    'media', 'prompts', 'loaders', 'accelerator', 'controlnets', 'conditioning','features', 'inputs', 'outputs', 'tools', 'switch', 'pack',
    'api']
backend_dir = 'py'
temp_backend_dir = 'py_temp'

if os.path.exists(os.path.join(cwd_path, temp_backend_dir)):
    import shutil
    backend_path = os.path.join(cwd_path, backend_dir)
    temp_backend_path = os.path.join(cwd_path, temp_backend_dir)
    # Check if temp backend dir has files
    if os.listdir(temp_backend_path):
        # Remove original backend directory if exists
        if os.path.exists(backend_path):
            shutil.rmtree(backend_path)
        # Rename temp_backend_dir to backend_dir
        os.rename(temp_backend_path, backend_path)

if os.path.isfile(config_path):
    with open(config_path, 'r') as f:
        data = yaml.load(f, Loader=yaml.FullLoader)

        if data and "WEB_VERSION" in data:
            directory = f"web/{data['WEB_VERSION']}"
        else:
            directory = f"web/{web_default_version}"

        if data and "BACKEND_DEV" in data:
            if data['BACKEND_DEV']:
                backend_dir = 'backend'

    if not os.path.exists(os.path.join(cwd_path, directory)):
        print(f"web root {data['WEB_VERSION']} not found, using default")
        directory = f"web/{web_default_version}"
else:
    directory = f"web/{web_default_version}"

for module_name in basic_lists:
    imported_module = importlib.import_module(".{}.node.{}".format(backend_dir, module_name), __name__)
    NODE_CLASS_MAPPINGS = {**NODE_CLASS_MAPPINGS, **imported_module.NODE_CLASS_MAPPINGS}
    NODE_DISPLAY_NAME_MAPPINGS = {**NODE_DISPLAY_NAME_MAPPINGS, **imported_module.NODE_DISPLAY_NAME_MAPPINGS}

print(f'\033[34m[ComfyUI-Fast-Use] server: \033[0mv{__version__} \033[92mLoaded\033[0m')
WEB_DIRECTORY =  directory


